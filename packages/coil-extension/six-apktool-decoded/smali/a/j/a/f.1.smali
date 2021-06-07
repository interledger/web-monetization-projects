.class La/j/a/f;
.super Ljava/lang/Object;
.source ""

# interfaces
.implements Landroidx/lifecycle/h;


# annotations
.annotation system Ldalvik/annotation/EnclosingMethod;
    value = La/j/a/g;->b(Landroid/view/LayoutInflater;Landroid/view/ViewGroup;Landroid/os/Bundle;)V
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

    iput-object p1, p0, La/j/a/f;->a:La/j/a/g;

    invoke-direct {p0}, Ljava/lang/Object;-><init>()V

    return-void
.end method


# virtual methods
.method public a()Landroidx/lifecycle/f;
    .locals 3

    iget-object v0, p0, La/j/a/f;->a:La/j/a/g;

    iget-object v1, v0, La/j/a/g;->V:Landroidx/lifecycle/j;

    if-nez v1, :cond_0

    new-instance v1, Landroidx/lifecycle/j;

    iget-object v2, v0, La/j/a/g;->W:Landroidx/lifecycle/h;

    invoke-direct {v1, v2}, Landroidx/lifecycle/j;-><init>(Landroidx/lifecycle/h;)V

    iput-object v1, v0, La/j/a/g;->V:Landroidx/lifecycle/j;

    :cond_0
    iget-object v0, p0, La/j/a/f;->a:La/j/a/g;

    iget-object v0, v0, La/j/a/g;->V:Landroidx/lifecycle/j;

    return-object v0
.end method
