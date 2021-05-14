.class Landroidx/recyclerview/widget/x;
.super Ljava/lang/Object;
.source ""

# interfaces
.implements Ljava/lang/Runnable;


# annotations
.annotation system Ldalvik/annotation/EnclosingClass;
    value = Landroidx/recyclerview/widget/D;
.end annotation

.annotation system Ldalvik/annotation/InnerClass;
    accessFlags = 0x0
    name = null
.end annotation


# instance fields
.field final synthetic a:Landroidx/recyclerview/widget/D;


# direct methods
.method constructor <init>(Landroidx/recyclerview/widget/D;)V
    .locals 0

    iput-object p1, p0, Landroidx/recyclerview/widget/x;->a:Landroidx/recyclerview/widget/D;

    invoke-direct {p0}, Ljava/lang/Object;-><init>()V

    return-void
.end method


# virtual methods
.method public run()V
    .locals 2

    iget-object v0, p0, Landroidx/recyclerview/widget/x;->a:Landroidx/recyclerview/widget/D;

    iget-boolean v1, v0, Landroidx/recyclerview/widget/D;->E:Z

    if-eqz v1, :cond_3

    invoke-virtual {v0}, Landroid/view/ViewGroup;->isLayoutRequested()Z

    move-result v0

    if-eqz v0, :cond_0

    goto :goto_0

    :cond_0
    iget-object v0, p0, Landroidx/recyclerview/widget/x;->a:Landroidx/recyclerview/widget/D;

    iget-boolean v1, v0, Landroidx/recyclerview/widget/D;->B:Z

    if-nez v1, :cond_1

    invoke-virtual {v0}, Landroidx/recyclerview/widget/D;->requestLayout()V

    return-void

    :cond_1
    iget-boolean v1, v0, Landroidx/recyclerview/widget/D;->H:Z

    if-eqz v1, :cond_2

    const/4 v1, 0x1

    iput-boolean v1, v0, Landroidx/recyclerview/widget/D;->G:Z

    return-void

    :cond_2
    invoke-virtual {v0}, Landroidx/recyclerview/widget/D;->b()V

    :cond_3
    :goto_0
    return-void
.end method
