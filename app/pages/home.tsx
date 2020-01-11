import { ButtonComponent, ContentContainerComponent, FormComponent, FormInputComponent } from "@justaddjam/strawberry";
import * as React from "react";
import { useLocalCollection } from "../prototyping/use-local-collection";

export default function Home() {
    const {
        add,
        remove,
        collection
    } = useLocalCollection<{ name: string }>("todos");

    return <ContentContainerComponent>
                <h2>Home</h2>
                <FormComponent id="sample" onSubmit={(x) => add(x as any)}>
                    <ul>
                        {collection
                            .map(x => <li>
                                        {x.name}
                                        <ButtonComponent onClick={() => remove(x)}>Delete</ButtonComponent>
                                      </li>
                                )
                        }
                    </ul>
                    <FormInputComponent label="Name" name="name" required />
                    <ButtonComponent type="submit">Submit</ButtonComponent>
                </FormComponent>
            </ContentContainerComponent>;
}
