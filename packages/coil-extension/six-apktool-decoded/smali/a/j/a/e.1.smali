.class La/j/a/e;
.super La/j/a/j;
.source ""


# annotations
.annotation system Ldalvik/annotation/EnclosingMethod;
    value = La/j/a/g;->A()V
.end annotation

.annotation system Ldalvik/annotation/InnerClass;
    accessFlags = 0x0
    name = null
.end annotation


# instance fields
.field final synthetic a:La/j/a/g;


# direct methods
.method constructor <init>(La/j/a/g;)V
    .locals 0

    iput-object p1, p0, La/j/a/e;->a:La/j/a/g;

    invoke-direct {p0}, La/j/a/j;-><init>()V

    return-void
.end method


# virtual methods
.method public a(Landroid/content/Context;Ljava/lang/String;Landroid/os/Bundle;)La/j/a/g;
    .locals 1

    iget-object v0, p0, La/j/a/e;->a:La/j/a/g;

    iget-object v0, v0, La/j/a/g;->u:La/j/a/l;

    invoke-virtual {v0, p1, p2, p3}, La/j/a/j;->a(Landroid/content/Context;Ljava/lang/String;Landroid/os/Bundle;)La/j/a/g;

    move-result-object p1

    return-object p1
.end method

.method public a(I)Landroid/view/View;
    .locals 1

    iget-object v0, p0, La/j/a/e;->a:La/j/a/g;

    iget-object v0, v0, La/j/a/g;->K:Landroid/view/View;

    if-eqz v0, :cond_0

    invoke-virtual {v0, p1}, Landroid/view/View;->findViewById(I)Landroid/view/View;

    move-result-object p1

    return-object p1

    :cond_0
    new-instance p1, Ljava/lang/IllegalStateException;

    const-string v0, "Fragment does not have a view"

    invoke-direct {p1, v0}, Ljava/lang/IllegalStateException;-><init>(Ljava/lang/String;)V

    throw p1
.end method

.method public a()Z
    .locals 1

    iget-object v0, p0, La/j/a/e;->a:La/j/a/g;

    iget-object v0, v0, La/j/a/g;->K:Landroid/view/View;

    if-eqz v0, :cond_0

    const/4 v0, 0x1

    goto :goto_0

    :cond_0
    const/4 v0, 0x0

    :goto_0
    return v0
.end method
